/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "aab7d501b7dd14f286ad75ba4a7ef597"
  },
  {
    "url": "assets/css/0.styles.7adf3117.css",
    "revision": "9688fc87ce34dd8de21fcf4e502bce74"
  },
  {
    "url": "assets/git/git1.png",
    "revision": "a315ad46f5d4ad96248c81863958e865"
  },
  {
    "url": "assets/git/git2.png",
    "revision": "365165eb7632846f43425de8d9b6f0e8"
  },
  {
    "url": "assets/git/git3.png",
    "revision": "260668bb529c43453c83512c272aa947"
  },
  {
    "url": "assets/git/git4.png",
    "revision": "143c2af374033cabc0ac74b392d598c7"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "73f420586b4bea5affae1a4402859fec"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.98c66250.js",
    "revision": "21c15249a67335944c3bb72aada7321e"
  },
  {
    "url": "assets/js/11.c56e18b7.js",
    "revision": "fabf0f8adc9948a861a3e8ca42415877"
  },
  {
    "url": "assets/js/12.5db6e70f.js",
    "revision": "ace53280102fb62d88f0c91159a8b998"
  },
  {
    "url": "assets/js/13.b2b13278.js",
    "revision": "6ce4938b526f20496b0ab6d87e24f090"
  },
  {
    "url": "assets/js/14.78f30561.js",
    "revision": "63807597bbea4b1763d7d5328a5691af"
  },
  {
    "url": "assets/js/15.a9c8cbaf.js",
    "revision": "88800450d114b50941052b0b26cc1c8b"
  },
  {
    "url": "assets/js/16.d3d08f69.js",
    "revision": "e6a023a7a51a02b7eb59514010f7693c"
  },
  {
    "url": "assets/js/17.2dd50800.js",
    "revision": "2b17623ce4cf15c9704c845b6d9af32b"
  },
  {
    "url": "assets/js/18.14f5627a.js",
    "revision": "d5023f23e3945d7411b19a2015c8dab2"
  },
  {
    "url": "assets/js/19.842c6f50.js",
    "revision": "7718e0b582b9e1e63141e69a4da40ea1"
  },
  {
    "url": "assets/js/2.b2d070e6.js",
    "revision": "42e58157733cec58b2197214f98af0b2"
  },
  {
    "url": "assets/js/20.4f3badb3.js",
    "revision": "45f03f13f73a8ae4deefd1a239b7c31a"
  },
  {
    "url": "assets/js/21.be701f26.js",
    "revision": "ea5f2cfe060c825c5eb1148b96ccf22e"
  },
  {
    "url": "assets/js/22.4d1356f6.js",
    "revision": "4ec84205b6eb12ad2dd72a7e231115c9"
  },
  {
    "url": "assets/js/23.742c4861.js",
    "revision": "d3331a8576909a96f021ab2c9db0f9ad"
  },
  {
    "url": "assets/js/24.4ea5ed74.js",
    "revision": "6cf055911ac291d2c37e7924997622da"
  },
  {
    "url": "assets/js/25.8cdb0dd2.js",
    "revision": "31789cb8a805e1d9b6b21364c262f76c"
  },
  {
    "url": "assets/js/26.55d2641b.js",
    "revision": "7d82d33e696238813cd383015d936573"
  },
  {
    "url": "assets/js/27.a6a51c41.js",
    "revision": "b3a36ea948d11017059ea528824f1b61"
  },
  {
    "url": "assets/js/28.feea5127.js",
    "revision": "95eb0f94259096a533657525b98f88a8"
  },
  {
    "url": "assets/js/29.91c61abd.js",
    "revision": "afcb22d49e796c2bffa09d23a3f6579d"
  },
  {
    "url": "assets/js/3.8cf3b89c.js",
    "revision": "fb82287c6386b22666bfd97de2145392"
  },
  {
    "url": "assets/js/30.f168db5e.js",
    "revision": "55fa796355456529cc8f344f7cdeac54"
  },
  {
    "url": "assets/js/31.227ba182.js",
    "revision": "1e6d170b360a65e5651778487ba79091"
  },
  {
    "url": "assets/js/32.d0eb0625.js",
    "revision": "6be0ca737cada92df26e2f87f3d49529"
  },
  {
    "url": "assets/js/33.05a2d492.js",
    "revision": "dfbd3a417e6920fdcd26d33acbd8ac3a"
  },
  {
    "url": "assets/js/34.b10b07c7.js",
    "revision": "cef415a783a563559b1987006c9b7e3c"
  },
  {
    "url": "assets/js/35.d0cb7cb2.js",
    "revision": "eb1e7d74204d65c42e385a2178cae0d5"
  },
  {
    "url": "assets/js/36.328f34ec.js",
    "revision": "6762a553829467905fe5dea9671aecd5"
  },
  {
    "url": "assets/js/37.023353ed.js",
    "revision": "6eba651d553dd2a6b1bbcc280a1f1443"
  },
  {
    "url": "assets/js/38.91dc5f83.js",
    "revision": "71273f968604b78844d273cd220dd96e"
  },
  {
    "url": "assets/js/39.046dbc7e.js",
    "revision": "23708cce3c869d83b66a9bf77a8de4ad"
  },
  {
    "url": "assets/js/4.8a311255.js",
    "revision": "a69e3ac8c755d5208ac43508016641a3"
  },
  {
    "url": "assets/js/40.d8320844.js",
    "revision": "17065b5357fe917ec9c08024b438c51e"
  },
  {
    "url": "assets/js/41.c075de24.js",
    "revision": "58928dbd73bbd9cede2d5d84dcf9e742"
  },
  {
    "url": "assets/js/42.97e05f0f.js",
    "revision": "18331632935d321daf8107468beb9e49"
  },
  {
    "url": "assets/js/43.907b9262.js",
    "revision": "e614a45f107c162d0079e6a6efe2dc69"
  },
  {
    "url": "assets/js/44.eab23cc1.js",
    "revision": "ccb2ad71f0b41b8edc42bbee2dc75b22"
  },
  {
    "url": "assets/js/45.2cda785e.js",
    "revision": "7b919f917bbe91e57a2a370413929d69"
  },
  {
    "url": "assets/js/46.2b1c7060.js",
    "revision": "f7f33bb5792ce30bf19a8569b166d53f"
  },
  {
    "url": "assets/js/47.df7a7374.js",
    "revision": "11e2adbaf105f404cb57239403e13b9b"
  },
  {
    "url": "assets/js/48.f49d3c8f.js",
    "revision": "9ebfa7ed11f851700de13e8745ee763e"
  },
  {
    "url": "assets/js/49.45a6143b.js",
    "revision": "d42a7586778a57a08b64a471d74711d3"
  },
  {
    "url": "assets/js/5.a513217f.js",
    "revision": "421ac9ba19e739bb753ea8079fa0059b"
  },
  {
    "url": "assets/js/50.53683afb.js",
    "revision": "26e5d80d6f3ceda47c2f4c6bc2502d2b"
  },
  {
    "url": "assets/js/51.765f0ab6.js",
    "revision": "4860468a0f2834b4d04b75ec55c24065"
  },
  {
    "url": "assets/js/6.7ea4f2b0.js",
    "revision": "ecbba386ab71ec13c30b48aa6ae990d9"
  },
  {
    "url": "assets/js/7.f5757c8b.js",
    "revision": "bea4a7cea82995937e50e3ac82467009"
  },
  {
    "url": "assets/js/8.b3a2010b.js",
    "revision": "4eafcb435130891ea936b0f4a67d7c71"
  },
  {
    "url": "assets/js/9.4e9ab4a0.js",
    "revision": "cd4882e63507515b21c74b10d8d1cdba"
  },
  {
    "url": "assets/js/app.d7492e7d.js",
    "revision": "67cbcbc99c8b3d32c24da9d5cd6e1eef"
  },
  {
    "url": "assets/ts/greet5.png",
    "revision": "9b130423786e2928b0a3652f92ec4ddc"
  },
  {
    "url": "assets/ts/logabc.png",
    "revision": "ef3c13407a13b10208af00b2d8d19c37"
  },
  {
    "url": "assets/ts/tsVSjs.png",
    "revision": "801a8692a31eeec770fc7f4c1dfc94af"
  },
  {
    "url": "assets/webgl/gurd.png",
    "revision": "f5bcc880051d774661435ad7307372b5"
  },
  {
    "url": "assets/webpack/introduce.png",
    "revision": "74689b220a4999b1069444333d937ff2"
  },
  {
    "url": "frontend/CSS/CSS-1.html",
    "revision": "4db754b6bf52048730a900f7823b7ae4"
  },
  {
    "url": "frontend/CSS/CSS-2.html",
    "revision": "87995c30fb8e529b0e0b1dae9060ab5d"
  },
  {
    "url": "frontend/CSS/index.html",
    "revision": "b36ae2aea2f4e084ec213139ac24f871"
  },
  {
    "url": "frontend/HTML/HTML-1.html",
    "revision": "56ea99d38da666a8829ecf50001f1f08"
  },
  {
    "url": "frontend/HTML/HTML-2.html",
    "revision": "60dbe1b2bab43ee6e4c9adf1afb42df8"
  },
  {
    "url": "frontend/HTML/index.html",
    "revision": "2236d0cd8de51f098ef7c77bb18c3926"
  },
  {
    "url": "frontend/HTTP/http-1.html",
    "revision": "a7ee4490ba248df625ffe99d8b2f6493"
  },
  {
    "url": "frontend/HTTP/http-2.html",
    "revision": "3fe4ccafd851c4a0a82eecb64117f622"
  },
  {
    "url": "frontend/HTTP/index.html",
    "revision": "b9bd549e6f835ad4c697dc2d2697235e"
  },
  {
    "url": "frontend/JavaScript/index.html",
    "revision": "3e1cfe7891bcf8ed82c2bbf82ce048d1"
  },
  {
    "url": "frontend/JavaScript/JavaScript-1.html",
    "revision": "e6371421eb0bedf94d2bf805c79d631a"
  },
  {
    "url": "frontend/JavaScript/JavaScript-2.html",
    "revision": "a1d4887f85427aafccd7452636f371ca"
  },
  {
    "url": "frontend/TypeScript/assertion.html",
    "revision": "315eb93f316217448046e8b8ecf7784a"
  },
  {
    "url": "frontend/TypeScript/class.html",
    "revision": "02ba7b880bdfe6e0d6bba0e51f39c236"
  },
  {
    "url": "frontend/TypeScript/classSafety.html",
    "revision": "52cbe9c1b1446d84cc457184d19d6cc3"
  },
  {
    "url": "frontend/TypeScript/cross.html",
    "revision": "a3129bc11d9e10fe921f7d0a882ecf9b"
  },
  {
    "url": "frontend/TypeScript/function.html",
    "revision": "4c610ccdaf94f5935a59c742a8e0c9e4"
  },
  {
    "url": "frontend/TypeScript/generic.html",
    "revision": "2d72a0b2090c2f88bee77cc777f979a1"
  },
  {
    "url": "frontend/TypeScript/guard.html",
    "revision": "f611ecf9586c3f40ae20c13260b1de4a"
  },
  {
    "url": "frontend/TypeScript/index.html",
    "revision": "eabba8e03883e17d44384de87ef19227"
  },
  {
    "url": "frontend/TypeScript/interface.html",
    "revision": "e2852073b0021d2ecea16d92723ca2a9"
  },
  {
    "url": "frontend/TypeScript/joint.html",
    "revision": "faf850855184767809176cb7ced031a0"
  },
  {
    "url": "frontend/TypeScript/kind.html",
    "revision": "ce1805bab96e697394ed385275804b8b"
  },
  {
    "url": "frontend/Vue/index.html",
    "revision": "4a2bcc6920a6b68cb755de05226aef3c"
  },
  {
    "url": "frontend/Vue/Vue-1.html",
    "revision": "d43c192f51864b8f94c23f05f015989b"
  },
  {
    "url": "frontend/Vue/Vue-2.html",
    "revision": "9f4d443126a682b637601efdbb79b0e6"
  },
  {
    "url": "frontend/WebGL/grid.html",
    "revision": "ea7ba765396cdbee9cab04444d516013"
  },
  {
    "url": "frontend/WebGL/index.html",
    "revision": "3b5e8263db31cb4cde9afa3c075ea50d"
  },
  {
    "url": "frontend/WebGL/points.html",
    "revision": "2cffe647167ec30a31b3933c2581a3a3"
  },
  {
    "url": "frontend/webpack/index.html",
    "revision": "a69adcce75a2ecc7e1bc5968a68d8d9c"
  },
  {
    "url": "hero.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "icons/apple-touch-icon-128x128.png",
    "revision": "135c2aba490db14f8200cd772995f35d"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "dc7ac2de31649de6f88df341b87d744f"
  },
  {
    "url": "icons/apple-touch-icon-192x192.png",
    "revision": "6171be93b691ce4f9546def624bcadc3"
  },
  {
    "url": "icons/apple-touch-icon-384x384.png",
    "revision": "f5ff44fc10f11d717056f8108e7f4a9d"
  },
  {
    "url": "icons/apple-touch-icon-512x512.png",
    "revision": "cee47d4601b5a5c4dada3693ffd3ef94"
  },
  {
    "url": "icons/apple-touch-icon-72x72.png",
    "revision": "61eb9ebb22b0c68b6e236b859094a865"
  },
  {
    "url": "icons/apple-touch-icon-96x96.png",
    "revision": "c430ea29655773327896f7d65fe94c46"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "a4271dfcd229369a16522b36b4241afa"
  },
  {
    "url": "index.html",
    "revision": "261a4d503482f63185b3488449949373"
  },
  {
    "url": "pit/git/index.html",
    "revision": "74eeaccdcbb1d2a1e4ba298222a0ad4e"
  },
  {
    "url": "synopsis/guide.html",
    "revision": "2a53737ba293f4c44e5be0271e17690d"
  },
  {
    "url": "synopsis/index.html",
    "revision": "757db5157ea1658b18a6d49868abad46"
  },
  {
    "url": "synopsis/other.html",
    "revision": "bfea9f1bca44fe67282697f7f1d2e665"
  },
  {
    "url": "Weekly/five.html",
    "revision": "119269ff44e6f4c8a76bf2b19ae05578"
  },
  {
    "url": "Weekly/fore.html",
    "revision": "c8fed2526207c65986b58c03726a92a5"
  },
  {
    "url": "Weekly/index.html",
    "revision": "6aa337f6e381cdacb54d2ad4929f37be"
  },
  {
    "url": "Weekly/one.html",
    "revision": "d80edd95441631b656ba36b5b8fd6806"
  },
  {
    "url": "Weekly/three.html",
    "revision": "a87a3fc035423edac4a21b8f9fa9afad"
  },
  {
    "url": "Weekly/two.html",
    "revision": "34bd97d133958746dc03ff4d77b82759"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
