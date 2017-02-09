/**
 * Created by an.han on 16/10/15.
 */

export default {
  state: {
    message: 'yes!'
  },
  actions: {
        replaceList: context=> {
            var t = [];
            let i = 0;
            while (i < 7) {
                t.push(Math.random());
                i++;
            }
            setTimeout(()=> {
                context.commit("replaceList", t);
            }, 1000);
        }
    },
  mutations: {
    MESSAGE (state, value) {
      state.message = value || state.message;
    },
   replaceList: (state, payload)=> {
            console.log(state, payload)
            state.list = payload ;
        },
   addItem: state=> {
            state.list.push(Math.random());
        }
  },
    getters: {
        cc: state => {
            return state.count + "  hello!";
        }
    }
}