//路由配置
//const Hello = r => require(['../components/Hello'], r);
//const TestPage = r => require(['../components/TestPage'], r);
const Hello = process.BROWSER  ? () => System.import('../components/Hello.vue') : require('../components/Hello.vue')
const TestPage = process.BROWSER  ? () => System.import('../components/TestPage.vue') : require('../components/TestPage.vue')

console.log(process.BROWSER);
// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {path: '', redirect: {name: 'hello'}},
  {path: '/hello', component: Hello, name: 'hello'},
  {path: '/testPage', component: TestPage, name: 'testPage'}
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
//routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
