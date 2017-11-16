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
import com.umeng.socialize.UMAuthListener;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.bean.SHARE_MEDIA;

import java.util.Map;

public class LoginModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private Context context;
    private static Activity mActivity;
    private static Handler mHandler = new Handler(Looper.getMainLooper());

    public static void initActivity(Activity activity) {
        mActivity = activity;
    }

    public LoginModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    private static void runOnMainThread(Runnable task) {
        mHandler.post(task);
    }

    @Override
    public String getName() {
        return "loginModule";
    }


    @ReactMethod
    public void login(int platform, final Callback resultCallback) {
        UMShareAPI.get(context).getPlatformInfo(mActivity, getSharePlatform(platform), new UMAuthListener() {
            @Override
            public void onStart(SHARE_MEDIA share_media) {

            }

            @Override
            public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                String temp = "";
                for (String key : map.keySet()) {
                    temp = temp + key + " : " + map.get(key) + "\n";
                }
                resultCallback.invoke("登录成功：" + temp);
            }

            @Override
            public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
                resultCallback.invoke("登录失败：" + throwable.getMessage());
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media, int i) {
                resultCallback.invoke("取消登录");
            }
        });
    }

    private SHARE_MEDIA getSharePlatform(int platform) {
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
