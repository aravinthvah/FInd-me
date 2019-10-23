// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const FIREBASE_CONFIG= {

    apiKey: "AIzaSyCyByEhd1_KXMggxtV5Pl3gFHo0Ci43Veo",
    authDomain: "aravinth-b587a.firebaseapp.com",
    databaseURL: "https://aravinth-b587a.firebaseio.com",
    projectId: "aravinth-b587a",
    storageBucket: "aravinth-b587a.appspot.com",
    messagingSenderId: "766364250627",
    appId: "1:766364250627:web:1be2a5bdb563575b0d5436"
  
};

export const snapshotToArray = snapshot => {
	
	let returnArray=[];
	snapshot.foreach(childSnapshot=> {
	let item = childSnapshot.val();
	item.key = childSnapshot.key;
	returnArray.push(item);
   
});
 return returnArray;

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
