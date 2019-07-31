# Common service guide

## Message

- In order to show message after some action, you need to call the service.
- They are 4 types of message: `Success, Info, Warning and Error`.
- I recommend you to show message after action like CRUD, validate,...
- Usage: Call function base on your message you need, ex: createSccessMessage, with param is your message.
- Example:
  * `this.commonService.createSuccessMessage("Update success");`
  * `this.commonService.createErrorMessage("Can not delete this user");`

## Modal

- Create a popup confirm with `Yes, No` button, `Title` and `Content` you can define by yourself
- Usage: Call function with param is `title` and `message`, right now we only do `Alert modal`(for delete) and `Confirm modal`(when user input, haven't submit and leave).
- Example:
  * `this.commonService.createAlertModal("Delete confirmation", "Do you want to delete this product?");`

## Convert base64string to ArrayBuffer

- This function use to covert base64 of your image upload to Array buffer
- Usage: Call function with param is your base64string.
- Example:
  * `this.commonService.urlB64ToUint8Array(this.myImgb64String);`

## Covert Date

- Convert Date to display it by format in your country, example: US->30/12/2018, JAPAN->2018-12-30,...
- Usage: Call function with param is your date (date can be string, date,...), then we use moment to give you the format you want.
- Example:
  *`this.commonService.convertDate(new Date());`

## Detect IE or Edge Browser

- Detect if user use IE or Edge with this app.
- Usage: Call function, return true is IE or Edge
- Example:
  *`this.isIEorEdge = this.commonService.detectIEOrEdgeBrowser();`

## Convert alphanumberic and symbol two byte to one byte

- Read title :)
- Usage: Call function with param is data you want to covenrt, it will return new data.
- Example:
  *`this.inputData = this.commonService.convertToHalfWidth(this.inputData);`

## Convert file to base64

- Some api need base64 to upload image to server, so we need covert the image we upload to base64
- Usage: Call function with param is your upload file.
- Example:
  *`this.commonService.convertFileToBase64(this.inputFile);`

## Encode and export CSV

- Use this function to export your data to csv file.
- Usage: Call function with param is your data, it will ask your browser to download the export csv file.
- Example:
  *`this.commonService.encodingExportCSV(this.dataToExport);`

## Read data from upload file and show preview

- Use this function to show image preview when upload a image file.
- Usage: Call function with 2 params: your input file and html image tag id.
- Example:
  *`this.commonService.readURL(this.inputFile, this.imgTagId);`

## Close guard service

- Prevent user go to another component if have unsave or unsummit input, it will show a popup confirm user to stay at this commponent or leave.
- Usage: 
  * Add var `isInput = true` for `input` that you need it save or summit before go to another component
  * Go to it `routing module`, import `CloseGuard Service`, add this key and value to it component `canDeactivate: [CloseGuard]`.
- Example:
  * <input (input)="isInput=true" matInput placeholder="Favorite food" value="Sushi">
  * `{ path: 'home', component: HomeComponent, data: { title: extract('Home') }, canDeactivate: [CloseGuard] }`
- You can customize this popup confirm by edit `confirm-dialog component`.