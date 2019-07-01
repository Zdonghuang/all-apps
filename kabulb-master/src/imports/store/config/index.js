export default {
    namespaced: true,

    state: () => ({
        bottomline: 0,
        baseline: 0,
        testStage: 0,
        psudoML: false,
        temperature: 0,
        lumination: 0,
    }),

    getters: {
        bottomline: state => state.bottomline,
        baseline: state => state.baseline,
        testStage: state => state.testStage,
        temperature: state => state.temperature,
        lumination: state => state.lumination,
    },

    mutations: {
        bottomline: (state, value) => {
            state.bottomline = value
        },
        baseline: (state, value) => {
            state.baseline = value
        },
        testStage: (state, value) => {
            state.testStage = value
        },
        temperature: (state, value) => {
            state.temperature = value
        },
        lumination: (state, value) => {
            state.lumination = value
        },
    },

    actions: {
        setBottomline({ commit }, value) {
            commit('bottomline', value)
        },
        setBaseline({ commit }, value) {
            commit('baseline', value)
        },
        setTestStage({ commit }, value) {
            commit('testStage', value)
        },
        setTemperature({ commit }, value) {
            commit('temperature', value)
        },
        setLumination({ commit }, value) {
            commit('lumination', value)
        },
    },
}
