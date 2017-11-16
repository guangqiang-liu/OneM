package com.one.module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMWeb;

public class ShareModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private Context context;
    private static Activity mActivity;
    private static Handler mHandler = new Handler(Looper.getMainLooper());

    public static void initActivity(Activity activity) {
        mActivity = activity;
    }

    public ShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    private static void runOnMainThread(Runnable task) {
        mHandler.post(task);
    }

    @Override
    public String getName() {
        return "shareModule";
    }

    @ReactMethod
    public void share(String title, String description,
                          String imgUrl, String contentUrl,final int platform,
                      final Callback resultCallback) {

        final UMWeb web = new UMWeb(contentUrl);
        web.setTitle(title);
        web.setThumb(new UMImage(context, imgUrl));
        web.setDescription(description);
        runOnMainThread(new Runnable() {
            @Override
            public void run() {
                new ShareAction(mActivity)
                        .setPlatform(getSharePlatform(platform))
                        .withMedia(web)
                        .setCallback(new UMShareListener() {
                            @Override
                            public void onStart(SHARE_MEDIA share_media) {
                            }

                            @Override
                            public void onResult(SHARE_MEDIA share_media) {
                                resultCallback.invoke("分享成功");
                            }

                            @Override
                            public void onError(SHARE_MEDIA share_media, Throwable throwable) {
                                resultCallback.invoke("分享失败：" + throwable.getMessage());
                            }

                            @Override
                            public void onCancel(SHARE_MEDIA share_media) {
                                resultCallback.invoke("取消分享");
                            }
                        })
                        .share();
            }
        });
    }

    private SHARE_MEDIA getSharePlatform(int platform){
        switch (platform) {
            case 0:
                return SHARE_MEDIA.QQ;
            case 1:
                return SHARE_MEDIA.SINA;
            case 2:
                return SHARE_MEDIA.WEIXIN;
            case 3:
                return SHARE_MEDIA.WEIXIN_CIRCLE;
            case 4:
                return SHARE_MEDIA.QZONE;
            case 5:
                return SHARE_MEDIA.FACEBOOK;
            default:
                return null;
        }
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        UMShareAPI.get(mActivity).onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onNewIntent(Intent intent) {
    }
}
