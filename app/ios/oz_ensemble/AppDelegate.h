#import <RCTAppDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
