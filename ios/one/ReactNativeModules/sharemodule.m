//
//  shareModule.m
//  RNShareDemo
//
//  Created by 刘光强 on 2017/11/14.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "shareModule.h"
#import <UMSocialCore/UMSocialCore.h>
#import <UMSocialCore/UMSocialManager.h>

@implementation shareModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(share:(NSString *) title
                  description:(NSString *)description
                  imgUrl:(NSString *)imgUrl
                  webpageUrl:(NSString *)webpageUrl
                  platform:(NSInteger)platform
                  callback:(RCTResponseSenderBlock)callback) {
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  
  //创建网页内容对象
  NSString *img = imgUrl;
  
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr: description thumImage:img];
  
  //设置网页地址
  shareObject.webpageUrl = webpageUrl;
  
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
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
  
  // 在主线程中操作
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[UMSocialManager defaultManager] shareToPlatform:type messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      NSString *response = @"分享成功";
      if (error) {
        
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
        
        if(error.code == UMSocialPlatformErrorType_Unknow) {
          response = @"未知错误";
        } else if (error.code == UMSocialPlatformErrorType_NotSupport) {
          response = @" 不支持（url scheme 没配置，或者没有配置-ObjC， 或则SDK版本不支持或则客户端版本不支持）";
        }  else if (error.code == UMSocialPlatformErrorType_AuthorizeFailed) {
          response = @"授权失败";
        } else if (error.code == UMSocialPlatformErrorType_ShareFailed) {
          response = @"分享失败";
        } else if (error.code == UMSocialPlatformErrorType_CheckUrlSchemaFail) {
          response = @"请求用户信息失败";
        } else if (error.code == UMSocialPlatformErrorType_ShareDataNil) {
          response = @"分享内容为空";
        } else if (error.code == UMSocialPlatformErrorType_ShareDataTypeIllegal) {
          response = @"分享内容不支持";
        } else if (error.code == UMSocialPlatformErrorType_CheckUrlSchemaFail) {
          response = @"schemaurl fail";
        } else if (error.code == UMSocialPlatformErrorType_NotInstall) {
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
        
        UMSocialLogInfo(@"response result %@", response);
        
      } else {
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        }else {
          UMSocialLogInfo(@"response data is %@",data);
        }
      }
      
      callback([[NSArray alloc] initWithObjects:response, nil]);
    }];
  });
}

@end
