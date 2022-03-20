import {IParam} from "../api/IParam";
import NumbersHelpers from "./numbers-helpers";

class ArgParser {

    private readonly PARAM_SPLITTER = "/";
    private readonly IP_SPLITTER = ".";

    private readonly PARAMS_COUNT = 2;
    private readonly MAX_MASK_BITS = 32;
    private readonly MASK_START_VALUE = Number.parseInt("11111111111111111111111111111111", 2);

    private octetShift = [24, 16, 8, 0];
    private ipWithMaskRegex = new RegExp("^((1?\\d?\\d|25[0-5]|2[0-4]\\d)([.])){3}(1?\\d?\\d|25[0-5]|2[0-4]\\d)/(\\d|[1-2]\\d|3[0-2])$");

    areParamsValid(programArgs: string[]): boolean {
        if (programArgs.length === this.PARAMS_COUNT) {
            for (const param of programArgs) {
                if (!this.ipWithMaskRegex.test(param)) {
                    return false
                }
            }
            return true
        }
        return false;
    }

    convertToIParameter(programArgs: string[]): IParam [] {
        return programArgs.map(param => this.toParam(param));
    }

    private toParam(paramValue: string): IParam {
        const splitParam = paramValue.split(this.PARAM_SPLITTER);
        if (splitParam.length !== 2) {
            throw new Error("Unable to properly process parameter.")
        }
        return {
            ipAddress: splitParam[0],
            ipMaskShort: splitParam[1],
            ipAddressNum: this.ipToNumeric(splitParam[0]),
            ipMaskNum: this.maskToNumeric(splitParam[1])
        }
    }

    private maskToNumeric(maskShortValue: string): number {
        const maskShortNum = Number.parseInt(maskShortValue);
        let maskNumeric = this.MASK_START_VALUE
        maskNumeric = NumbersHelpers.toUint32(maskNumeric << this.MAX_MASK_BITS - maskShortNum);
        return maskNumeric;
    }

    private ipToNumeric(ipAddress: string): number {
        const ipOctetSplit = ipAddress.split(this.IP_SPLITTER);
        if (ipOctetSplit.length !== 4) {
            throw new Error("Unable to properly process parameter.")
        }
        let ipBinary = 0;
        for (let i = 0; i < 4; i++) {
            let ipOctet = Number(ipOctetSplit[i]);
            ipOctet = ipOctet << this.octetShift[i]
            ipBinary = ipBinary | ipOctet;
        }
        return NumbersHelpers.toUint32(ipBinary);
    }

}


export default new ArgParser();
