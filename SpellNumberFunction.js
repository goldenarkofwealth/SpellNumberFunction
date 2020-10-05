const SpellNumber = function(number) {
    if (isNaN(number)) {
        return "NaN";
    }

    else if (number > 999999999999999 ) {
        return "number too large";
    }

    else {
        const splitNumber = number.toString().split('').reverse();
        const spelledNumber = [];
        const phraseList = [
            ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
            ["--", "Hundred", "Thousand", "Million", "Billion", "Trillion"],
            ["Noteen", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifthteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
            ["Zeroten", "Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
        ];
        
        for (let i = (splitNumber.length) + (splitNumber.length % 3) - 1; i >= 0;) { 
            pushPhrase(i, splitNumber[i]);
            i--;
        }

        function pushPhrase(index, value) {
            if (value == undefined) {
                //do nothing
            }

            else if ((index + 1) % 3 == 0) {
                if (value != 0) {
                    spelledNumber.push(phraseList[0][value]);
                    spelledNumber.push(phraseList[1][1]);
                }
                
            }

            else if ((index + 1) % 3 == 2) {
                spelledNumber.push(phraseList[3][value]);
            }

            else if ((index + 1) % 3 == 1) {
                //if [index - 1] is = "Ten" && [index] > 0 {change spellednumber[index - 1] to phraselist[2][index]}
                    //covers 11-19
                if (splitNumber[index + 1] == 1 && value > 0) {
                    spelledNumber.pop();
                    if (splitNumber[index + 2] != undefined) {
                        spelledNumber.push("And");
                    }
                    spelledNumber.push(phraseList[2][value]);
                }
                
                //if [index - 1] is = "Ten" && [index] == 0 {do nothing and keep spellednumber[index - 1] "ten"}
                    //covers 10
                else if (splitNumber[index + 1] == 1 && value == 0) {
                    spelledNumber.pop();
                    if (splitNumber[index + 2] != undefined) {
                        spelledNumber.push("And");
                    }
                    spelledNumber.push(phraseList[3][1]);
                }

                //if [index - 1] is = "Zeroten" && [index] > 0 {ommit spellednumber[index - 1] \\which is "zero"\\ ...
                // ... and replace with "and " + phraselist[0][value]}
                    //covers 01-09
                else if (splitNumber[index + 1] == 0 && value > 0) {
                    spelledNumber.pop();
                    spelledNumber.push("And");
                    spelledNumber.push(phraseList[0][value]);
                }
                
                //if [index - 1] is = "Zeroten" && [index] == 0 {ommit spellednumber[index - 1] and leave current index blank}
                    //covers 00
                else if (splitNumber[index + 1] == 0 && value == 0) {
                    spelledNumber.pop();
                }

                else if (splitNumber[index + 1] >= 2 && value == 0) {
                    //do nothing
                }

                //if [index - 1] is >= 2 \\"Twenty"\\ {do nothing and proceed with a hyphen ("-") beforehand}
                    //covers 21-29, 31-39, 41-49, etc.
                else {
                    if (splitNumber [index + 1] != undefined) {
                        spelledNumber.push("-");
                    }
                    spelledNumber.push(phraseList[0][value]);
                }


                //Number Scale Division Renderer
                if ((index + 1) % 3 == 1 || splitNumber[index + 1] != undefined) {
                    if (index + 1 > 3) {
                        spelledNumber.push(phraseList[1][(index / 3) + 1]); 
                    }
                }
            }

            else {}
        }
        
        //spacing code
        const tempArray = [];
        for (let i = 0; i < spelledNumber.length;) {

            tempArray.push(spelledNumber[i])
            if (i < spelledNumber.length - 1) {
                if (spelledNumber[i + 1] == "-" || spelledNumber[i] == "-") {
                    //dont space
                }

                else {
                    tempArray.push(" ");
                }
            }
            
            i++;
        }

        const speltString = tempArray.join("");
        return speltString;
    }
}

module.exports = SpellNumber;
/* Problems:
-None Currently :)

*/