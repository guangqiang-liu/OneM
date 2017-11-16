//
//  loginModule.m
//  RNShareDemo
//
//  Created by 刘光强 on 2017/11/14.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "loginModule.h"
#import <UMSocialCore/UMSocialCore.h>
#import <UMSocialCore/UMSocialManager.h>

@implementation loginModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(login:(NSInteger) platform callback:(RCTResponseSenderBlock) callback) {
  
  UMSocialPlatformType type = UMSocialPlatformType_Sina ;
  
  switch (platform) {
    case 0:
      type = UMSocialPlatformType_QQ;
      break;
    case 1:
      type = UMSocialPlatformType_Sina;
      break;
    case 2:
      type = UMSocialPlatformType_WechatSession;
      break;
    case 3:
      type = UMSocialPlatformType_WechatTimeLine;
      break;
    case 4:
      type = UMSocialPlatformType_Qzone;
      break;
    default:
      break;
  }
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UMSocialManager defaultManager] getUserInfoWithPlatform:type currentViewController:nil completion:^(id result, NSError *error) {
      NSString *response = @"登录成功";
      if (error) {
        
        UMSocialLogInfo(@"************Share fail with error %@*********", error);
        
        if(error.code == UMSocialPlatformErrorType_Unknow) {
          response = @"未知错误";
        } else if (error.code == UMSocialPlatformErrorType_NotSupport) {
          response = @" 不支持（url scheme 没配置，或者没有配置-ObjC， 或则SDK版本不支持或则客户端版本不支持）";
        }  else if (error.code == UMSocialPlatformErrorType_AuthorizeFailed) {
          response = @"授权失败";
        } else if (error.code == UMSocialPlatformErrorType_RequestForUserProfileFailed) {
          response = @"请求用户信息失败";
        } else if (error.code == UMSocialPlatformErrorType_CheckUrlSchemaFail) {
          response = @"schemaurl fail";
        }else if (error.code == UMSocialPlatformErrorType_NotInstall) {
          response = @"应用未安装";
        } else if (error.code == UMSocialPlatformErrorType_Cancel) {
          response = @"取消操作";
        } else if (error.code == UMSocialPlatformErrorType_NotNetWork) {
          response = @"网络异常";
        } else if (error.code == UMSocialPlatformErrorType_SourceError) {
          response = @"第三方错误";
        } else if (error.code == UMSocialPlatformErrorType_ProtocolNotOverride) {
          response = @"对应的UMSocialPlatformProvider的方法没有实现";
        } else if (error.code == UMSocialPlatformErrorType_NotUsingHttps) {
          response = @"没有用https的请求,@see UMSocialGlobal isUsingHttpsWhenShareContent";
        }
      } else {
        
        UMSocialUserInfoResponse *resp = result;
        
        // 第三方登录数据(为空表示平台未提供)
        // 授权数据
        NSLog(@" uid: %@", resp.uid);
        NSLog(@" openid: %@", resp.openid);
        NSLog(@" accessToken: %@", resp.accessToken);
        NSLog(@" refreshToken: %@", resp.refreshToken);
        NSLog(@" expiration: %@", resp.expiration);
        
        // 用户数据
        NSLog(@" name: %@", resp.name);
        NSLog(@" iconurl: %@", resp.iconurl);
        NSLog(@" gender: %@", resp.unionGender);
        
        // 第三方平台SDK源数据
        NSLog(@"Sina originalResponse: %@", resp.originalResponse);
        
        callback([[NSArray alloc] initWithObjects:resp.originalResponse, nil]);
      }
    }];
  });
}

@end
