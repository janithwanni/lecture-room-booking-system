// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBgAGP7Vsmb0VIkcRDUCWqtVMcDGQGHX3I",
    authDomain: "usjp-lecture-room-reservation.firebaseapp.com",
    databaseURL: "https://usjp-lecture-room-reservation.firebaseio.com",
    projectId: "usjp-lecture-room-reservation",
    storageBucket: "usjp-lecture-room-reservation.appspot.com",
    messagingSenderId: "33889317890"
  }
};
