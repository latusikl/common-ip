import print from './util/print';
import argParser from "./util/arg-parser";

function main() {
    print.appLogo()
    const programArgs = process.argv.slice(2);
    if (argParser.areParamsValid(programArgs)) {
        console.dir(programArgs)
        const parameters = argParser.convertToIParameter(programArgs);
        print.info(`Parameter 1: IP: ${parameters[0].ipAddress} | ${parameters[0].ipAddressNum.toString(2)}`)
        print.info(`Parameter 1: Mask: ${parameters[0].ipMaskShort} | ${parameters[0].ipMaskNum.toString(2)}`)
        print.info(`Parameter 2: IP: ${parameters[1].ipAddress} | ${parameters[1].ipAddressNum.toString(2)}`)
        print.info(`Parameter 2: Mask: ${parameters[1].ipMaskShort} | ${parameters[1].ipMaskNum.toString(2)}`)
    } else {
        print.error("Invalid number or parameters or parameters values are invalid.")
        print.commandUsage();
    }
}

main();
