export const genPassword = () => {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '1234567890';
    const specials = ',.!@#$%^&*';
    const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
    let opt, choose;
    let pass = "";
    for (let i = 0; i < 8; i++) {
        opt = Math.floor(Math.random() * options.length);
        choose = Math.floor(Math.random() * (options[opt].length));
        pass = pass + options[opt][choose];
        options.splice(opt, 1);
    }
    return pass
}