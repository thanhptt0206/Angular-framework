export class Constant {

  /* Virtual Key */
  public static readonly VK_ESC = 27;
  public static readonly VK_ENTER = 13;
  public static readonly VK_TAB = 9;

  /* ---------------------------- */
  /* ---------------------------- */
  /* - Request object constants - */
  /* ---------------------------- */
  /* ---------------------------- */
  public static readonly GRANT_TYPE_KEY = "grant_type";
  public static readonly CLIENT_ID_KEY = "client_id";
  public static readonly GRANT_TYPE_PASSWORD = "password";
  public static readonly GRANT_TYPE_REFRESH = "refresh_token";
  public static readonly CONTENT_DISPOSITION = 'Content-Disposition';


  static format(...strings: string[]) {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = strings[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < strings.length; i++) {
      // "gm" = RegEx options for Global search (more than one instance)
      // and for Multiline search
      var regEx = new RegExp("\\$\\{" + (i - 1) + "\\}", "gm");
      theString = theString.replace(regEx, strings[i]);
    }
    return theString;
  }


  /* -------------------- */
  /* ----- VALIDATE ----- */
  /* -------------------- */
  /* COMMON */
  public static readonly SEARCH_AND_INPUT_MAX_LENGTH = 255;
  public static readonly LAZY_LOAD_COMMON_LIMIT = 20;
  public static readonly INPUT_BIGINT_MIN_LENGTH = -9223372036854775808;
  public static readonly INPUT_BIGINT_MAX_LENGTH = 9223372036854775808;
  public static readonly INPUT_INTEGER_MIN_LENGTH = -2147483648;
  public static readonly INPUT_INTEGER_MAX_LENGTH = 2147483647;
  public static readonly NUMBER_PATTERN = '[0-9]+|[０-９]+';
  public static readonly ONLY_INPUT_NUMBER_PATTERN = '[0-9]+';
  public static readonly FORMAT_BIRTHDAY = "YYYY-MM-DD";
  public static readonly KANA_PATTERN = "[ァ-・ヽヾ゛゜ー]";
  public static readonly DATE_PATTERN = /^([2][01]|[1][6-9])\d{2}\/([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])(\s([0-1]\d|[2][0-3])(\:[0-5]\d){1,2})?$/;
  public static readonly DATE_PATTERN_YYYY_MM_DD = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  public static readonly REGEX_MONTH_YEAR = /((19|20)\d\d)[/](0[1-9]|1[012])/;
  public static readonly PATTERN_USERNAME = /^[a-zA-Z0-9-]*$/;
  public static readonly PATTERN_PASSWORD = /^[A-Za-z0-9!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

  //REGEX
  public static readonly REGEX_HALF_SIZE_ALPHABET = /^[A-Za-z]*$/;
  public static readonly REGEX_FULL_SIZE_KANA_HALF_SIZE_ALPHANUMBERIC = /^[\u30A0-\u30FFA-Za-z0-9\uFF0D\uFF1D\u0020\u3000!"#$%&'()\-^~\\|@`゛{;+:*},<.>/?_！\\”＃＄％＆’（）－＝＾～￥｜＠‘”｛；＋：＊｝、＜。＞・？＿\u005B\u005D\u309B\u2033]*$/;
  public static readonly REGEX_HALF_SIZE_KANA_HALF_SIZE_ALPHANUMBERIC = /^[\uFF67-\uFF9D\uFF9E\uFF9FA-Za-z0-9!"#$%&'()\-=^~\\|@`゛{;+:*},<.>/?_\u005B\u005D\u0020\u309B\u2033]*$/;
  public static readonly REGEX_FULL_SIZE_KANJI_HALF_SIZE_KANA_HALF_SIZE_ALPHANUMBERIC = /^[\u4E00-\u9FAF\u3041-\u3093\u30A0-\u30FF\uFF0D\uFF1D\uFF67-\uFF9D\uFF9E\uFF9FA-Za-z0-9!"#$%&'()\-=^~\\|@`゛{;+:*},<.>/?_！\\”＃＄％＆’（）－＝＾～￥｜＠‘”｛；＋：＊｝、＜。＞・？＿\u005B\u005D\u0020\u309B\u2033]*$/;
  public static readonly REGEX_HALF_SIZE_ALPHANUMBERIC = /^[A-Za-z0-9!"#$%&'()\-=^~\\|@`゛{;+:*},<.>/?_\u005B\u005D\u0020]*$/;
  public static readonly REGEX_NUMBER_ACCEPT_POINT = /^-?[0-9]+(\.[0-9]+)?$/;
  public static readonly REGEX_ONLY_NUMBERIC = /^[0-9０-９]*$/;
  public static readonly REGEX_EXCEPT_ALPHANUMBERIC = /^[^A-Za-z0-9\uFF21-\uFF5A\uFF10-\uFF19]*$/;
  public static readonly REGEX_FULL_SIZE_JAPANESE_HALF_SIZE_ALPHANUMBERIC = /^[\u4E00-\u9FAF\u3041-\u3093\u30A0-\u30FF\uFF0D\uFF1DA-Za-z0-9\u0020\u3000!"#$%&'()\-=^~\\|@`゛{;+:*},<.>/?_！\\”＃＄％＆’（）－＝＾～￥｜＠‘”｛；＋：＊｝、＜。＞・？＿\u005B\u005D\u0020]*$/;
  public static readonly REGEX_NUMBER_SYMBOL = /^\d+(\d+[-,.]?)*$/;
  public static readonly REGEX_ALPHANUMBERIC_SYMBOL = /^[A-Za-z0-9!"#$%&'()\-=^~\\|@`゛{;+:*},<.>/?_\u005B\u005D\u0020]*$/;
  public static readonly REGEX_EMAIL = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  public static readonly REGEX_FULL_JAPANESE = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
  public static readonly REGEX_FULL_HALF_KANA_HALF_SIZE_ALPHANUMBERIC = /^[\u3000-\u303f\u30a0-\u30ff\uFF67-\uFF9D\uFF9E\uFF9FA-Za-z0-9!"#$%&'()\-=^~\\|@`゛{;+:*},<.>/?_！\\”＃＄％＆’（）－＝＾～￥｜＠‘”｛；＋：＊｝、＜。＞・？＿\u005B\u005D\u0020\u309B\u2033]*$/;
  public static readonly REGEX_TWO_BYTE_ALPHANUMBERIC_SYMBOL = /[Ａ-Ｚａ-ｚ０-９_！\\”＃＄％＆’（）－＝＾～￥｜＠‘”｛；＋：＊｝、＜。＞・？＿]/g;

  /* SORT TYPE */
  public static readonly COMMON_ASC_SORT = "asc";
  public static readonly COMMON_DESC_SORT = "desc";

  /* -------------------- */
  /* ------- API  ------- */
  /* -------------------- */
  /* TOKEN */
  public static readonly AUTHEN_API = "/oauth/token";
  public static readonly CHECK_TOKEN_API = "/check_token";
  public static readonly NEW_TOKEN_API = "/user/new_token";
  public static readonly LOGIN_FACEBOOK_API = "/login_facebook";
  public static readonly LOGIN_GOOGLE_API = "/login_google";
  public static readonly REFRESH_TOKEN_API = "/oauth/refresh_token";
  public static readonly LOGOUT_API = "/logout";
  public static readonly LOGIN_API = "/login";

  /* NOTIFICATION */
  public static readonly NOTIFCATION_GEN_KEY = "/notification/gen-key/";
  public static readonly NOTIFCATION_SUBSCRITION = "/notification/subscribe_browser";

  /* --------------------- */
  /* ----- ERROR MSG ----- */
  /* --------------------- */

  /* --------------------- */
  /* ---- SUCCESS MSG ---- */
  /* --------------------- */

  /* --------------------- */
  /* -- CALENDER FORMAT -- */
  /* --------------------- */
  public static readonly FORMAT_DATE = "YYYY/MM/DD HH:mm";
  public static readonly SERVER_TIMEZONE_OFFSET = 0;
  public static readonly FORMAT_DATE_TIME = "YYYY/MM/DD HH:mm:ss";
  public static readonly CALENDAR_JA = {
    firstDayOfWeek: 0,
    dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
    dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    today: '今日',
    clear: 'クリア',
  };
  public static readonly CALENDAR_EN = {
    firstDayOfWeek: 0,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: 'Today',
    clear: 'Clear'
  };
  public static readonly YEAR_RANGER = "1950:" + new Date().getFullYear();
  public static readonly YEAR_RANGER_BIRTHDAY = (new Date().getFullYear() - 150) + ":" + (new Date().getFullYear() - 13);
  public static readonly DATE_FORMAT_YY_MM_DD = "yy-mm-dd";
  public static readonly MOMENT_DATE_FORMAT = "LLLL";
  public static readonly MOMENT_DATE_FORMAT_TIME_JP = "YYYY年MMMMD日 HH:mm:ss";
  public static readonly MOMENT_DATE_FORMAT_NOT_TIME_EN = "dddd, D MMMM YYYY";
  public static readonly MOMENT_DATE_FORMAT_NOT_TIME_JP = "YYYY年MMMMD日(dd)";
  public static readonly MOMENT_DATE_FORMAT_BIRTHDATE_JP = "LL";
  public static readonly MOMENT_DATE_FORMAT_BIRTHDATE_EN = "YYYY/MM/DD";
  public static readonly DATE_FORMAT_YY_MM_DD_2 = "yy/mm/dd";

  public static readonly COMMON_ONE_DAY = 86400000;
}