# Api service guide

## Set Headers
- Set header for all api, you can config it.

## Set Headers authen
- Sometime we dont use jwt for Authorization, you can set your `Authorization`.

## Handle Params
- Params can be null or undefine, use this function to convert them to "".

## Error Handler
- Some error about network that we can't catch and show msg, this function use to handle them, show msg error

## Common get, put, post, delete api
- Call this function base for method you need