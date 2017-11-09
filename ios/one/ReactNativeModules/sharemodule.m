#import "sharemodule.h"
#import <React/RCTBridgeModule.h>
#import <UMSocialCore/UMSocialCore.h>
#import <UMSocialCore/UMSocialManager.h>

@implementation sharemodule

RCT_EXPORT_MODULE(sharemodule)

RCT_EXPORT_METHOD(share:(NSString *) title descr:(NSString *) descr
                  webpageUrl:(NSString *) webpageUrl
                  thumbURL:(NSString*) thumbURLl
                  NSInteger:(NSInteger) platformType
                  callback:(RCTResponseSenderBlock) callback
                  ) {
  
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  //创建网页内容对象
  NSString *thumbURL = thumbURLl;
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:descr thumImage:thumbURL];
  //设置网页地址
  shareObject.webpageUrl = webpageUrl;
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
  UMSocialPlatformType type = UMSocialPlatformType_Sina ;
  
  switch (platformType) {
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
    case 5:
      type = UMSocialPlatformType_Facebook;
      break;
    default:
      break;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform:type messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      NSString *message = @"分享成功";
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********", error);
        if(error.code == 2009) {
          message = @"取消分享";
        } else {
          message = @"分享失败";
        }
      } else {
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@", resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@", resp.originalResponse);
          //          code = @"200";
          //          message = resp.originalResponse;
        } else {
          UMSocialLogInfo(@"response data is %@", data);
        }
      }
      callback( [[NSArray alloc] initWithObjects:message, nil]);
    }];
  });
}

@end

