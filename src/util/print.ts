import figlet, { Fonts } from 'figlet';
import chalk from 'chalk';
import constants from './constatns';

class Print {
  private LOGO_FONT: Fonts = 'Mini';

  appLogo() {
    console.log(chalk.green(figlet.textSync(constants.APP_NAME, this.LOGO_FONT)));
  }

  info(message: string) {
    // eslint-disable-next-line no-console
    console.log(
      `${chalk.bgGreen(chalk.grey(' INFO  '))}${chalk.inverse(` ${message} `)}\n`,
    );
  }

  warn(message: string) {
    // eslint-disable-next-line no-console
    console.log(
      `${chalk.bgYellow(chalk.grey(' WARN  '))}${chalk.inverse(` ${message} `)}\n`,
    );
  }

  error(message: string) {
    // eslint-disable-next-line no-console
    console.log(`${chalk.bgRed(chalk.grey(' ERROR '))}${chalk.inverse(` ${message} `)}\n`);
  }

  commandUsage() {
    // eslint-disable-next-line no-console
    console.log(`\n${chalk.bgWhite(chalk.bold('Usage example:'))} ./ipConflict 192.168.0.0/24 192.168.0.8/30`);
  }
}

export default new Print();
