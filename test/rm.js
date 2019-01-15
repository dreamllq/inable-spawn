const spawn = require('../index');

spawn("touch", ['test.txt']).then(() => {
    return spawn("rm", ['-i', 'test.txt']);
})