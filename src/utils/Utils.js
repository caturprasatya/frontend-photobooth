// Copyright 2022 catur
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

class Utilities{
    //convert price from integer format to string format eg : 1000->"IDR 1.000"
    int2string_price(price){    //must be int
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