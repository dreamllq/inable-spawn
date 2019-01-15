const { spawn } = require('child_process');
const readline = require('readline');


module.exports = async (command, args = [], options = {}) => {
    return new Promise((resolve, reject) => {
        let cmd = spawn(command, args, options);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (input) => {
            cmd.stdin.write(input);
            cmd.stdin.end();
        });

        cmd.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        cmd.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        cmd.on('close', (code) => {
            rl.close();
            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    })
}