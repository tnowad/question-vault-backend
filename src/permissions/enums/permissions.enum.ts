/**
 * @enum
 * Enum for permission values, categorized by different modules of the application.
 * Each permission follows the "module:action" format.
 */
export enum PermissionValue {
  /**
   * @memberof PermissionValue
   * Permission to sign out of the application (Auth module).
   */
  AUTH_SIGNOUT = 'auth:sign-out',

  /**
   * @memberof PermissionValue
   * Permission for signing in using email-based authentication (Auth Email module).
   */
  AUTH_EMAIL_SIGNIN = 'auth-email:sign-in',

  /**
   * @memberof PermissionValue
   * Permission for signing up using email-based authentication (Auth Email module).
   */
  AUTH_EMAIL_SIGNUP = 'auth-email:sign-up',

  /**
   * @memberof PermissionValue
   * Permission for initiating a forgot password process via email (Auth Email module).
   */
  AUTH_EMAIL_FORGOT_PASSWORD = 'auth-email:forgot-password',

  /**
   * @memberof PermissionValue
   * Permission to reset the password using email (Auth Email module).
   */
  AUTH_EMAIL_RESET_PASSWORD = 'auth-email:reset-password',

  /**
   * @memberof PermissionValue
   * Permission to view the admin panel (View module).
   */
  VIEW_ADMIN_PANEL = 'view:admin-panel',

  /**
   * @memberof PermissionValue
   * Permission to configure settings within the application (Settings module).
   */
  SETTINGS_CONFIGURATION = 'settings:configuration',
}
