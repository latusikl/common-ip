import print from './util/print';
import argParser from "./util/arg-parser";

function main() {
    print.appLogo()
    const programArgs = process.argv.slice(2);


    if (argParser.areParamsValid(programArgs)) {
        let isCommon = true;

        console.dir(programArgs)
        const parameters = argParser.convertToIParameter(programArgs);

        if (Number(parameters[0].ipMaskShort) < Number(parameters[1].ipMaskShort)) {

            for (let i = 0; i < Number(parameters[0].ipMaskShort) - 1; i++) {

                if (parameters[0].ipAddressNum.toString(2).charAt(i) != parameters[1].ipAddressNum.toString(2).charAt(i)) {
                    isCommon = false
                }
            }

        } else {

            for (let i = 0; i < Number(parameters[1].ipMaskShort) - 1; i++) {

                if (parameters[0].ipAddressNum.toString(2).charAt(i) != parameters[1].ipAddressNum.toString(2).charAt(i)) {
                    isCommon = false
                }
            }
        }

        if (isCommon) {

            print.appOutput("THERE IS A CONFLICT")

        } else {

            print.appOutput("THERE IS NOT A CONFLICT")

        }
    } else {
        print.error("Invalid number or parameters or parameters values are invalid.")
        print.commandUsage();
    }
}

main();
