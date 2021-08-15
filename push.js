var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJBH_PEBtX5l3sDBnIQfmABNNKWaxNiN1IcQl0Rxg29LRQ792ofhkTas7ntYcsJqmyfB-dowYu6QV-XDMHFVVoc",
   "privateKey": "gNHRkPz5WZeJmtpl0bMp5byyew76Ww6-Sz7891yZAB4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eeabeZrIroY:APA91bED8tfxj9xljnYKv7tH6DPpG0DMklWcvUS5SrBzIdSoAmAs3qLfSlEK2FYpSEpi5WXwMQ3QdeEvN6bcY6s1vuIXv3QHXGZhGL85D55tc98rUrpxgGmuclI1PHmtU8JlbQePEeYs",
   "keys": {
       "p256dh": "BOjecOy7Nx89EWdGaqPSJ4brp19qrVKbiCJjfeCNl2pDDx839rxD562FNXD5OSpW7hFGEI+dO/PNamYmJSSvjoU=",
       "auth": "1KGrhAeXKi2vkr/2I0vVKA=="
   }
};
var payload = 'Welcome to League Information App';
 
var options = {
   gcmAPIKey: '993153214111',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(function(err){
    console.log(err);
});