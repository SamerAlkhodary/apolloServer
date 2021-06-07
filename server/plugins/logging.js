const LogginPlugin =
{
  requestDidStart(initialRequestContext) {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
      res="";
    return {
      executionDidStart(executionRequestContext) {
        return {
          willResolveField({ source, args, context, info }) {
            const start = process.hrtime.bigint();
            return (error, result) => {
              const end = process.hrtime.bigint();
              if (error) {
                res = error;
              } else {
                res = result
              }
              console.log(` ${formatted_date} ${info.parentType.name}.${info.fieldName} ${JSON.stringify(args)} ${JSON.stringify(res)} ${end - start}ns`);

            };
          }
        }
      }
    }
  }
}
module.exports = LogginPlugin;