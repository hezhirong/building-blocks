import {createApp} from './main';

export default function (options) {
    const app = createApp(options);

    return new Promise(resolve => {
        resolve(app);
    });
}