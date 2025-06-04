import ky from 'ky';

export const kyAspDotnet = ky.extend({
  prefixUrl: "http://192.168.110.86:5296/", 
  hooks: {
    beforeRequest: [
      request => {
        // const token = Cookies.get("token")
        
        // if (token) {
        //   request.headers.set('Authorization', `Bearer ${token}`);
        // }
      }
    ]
  }
});

export const kyDjango = ky.extend({
  prefixUrl: "", 
  hooks: {
    beforeRequest: [
      request => {
        // const token = Cookies.get("token");
        
        // if (token) {
        //   request.headers.set('Authorization', `Bearer ${token}`);
        // }
      }
    ]
  }
});