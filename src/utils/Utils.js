class Utilities{
    //convert price from integer format to string format eg : 1000->"IDR 1.000, input must be integer"
    int2string_price(price){ 
        let s_price = price.toString();
        let output_text = '';
        for (let i = 0; i < s_price.length; i++) {
            if((i%3===0)&&(i!==0)){
                output_text = `.${output_text}`
            }
            output_text = `${s_price[s_price.length-1-i]}${output_text}`
          }
        return output_text;
    }
}

export default new Utilities();