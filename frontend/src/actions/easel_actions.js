import * as EaselApiUtil from '../util/easel_api_util';

export const RECEIVE_EASELS = "RECEIVE_EASELS"
export const RECEIVE_EASEL = "RECEIVE_EASEL"
export const REMOVE_EASEL = "REMOVE_EASEL"

const receiveEasels = (easels) => ({
    type: RECEIVE_EASELS,
    easels
})

const receiveEasel = (easel) => ({
    type: RECEIVE_EASEL,
    easel
})

const removeEasel = (easelId) => ({
    type: REMOVE_EASEL,
    easelId
})

export const fetchEasels = () => (dispatch) => (
    EaselApiUtil.fetchEasels()
        .then(easels => dispatch(receiveEasels(easels)))
)

export const fetchEasel = (easelId) => (dispatch) => (
    EaselApiUtil.fetchEasel(easelId)
        .then(easel => dispatch(receiveEasel(easel)))
)

export const createEasel = (easel) => (dispatch) => (
    EaselApiUtil.createEasel(easel)
        .then(easel => dispatch(receiveEasel(easel)))
)

export const updateEasel = (easel) => (dispatch) => (
    EaselApiUtil.updateEasel(easel)
        .then(easel => dispatch(receiveEasel(easel)))
)

export const deleteEasel = (easelId) => (dispatch) => (
    EaselApiUtil.deleteEasel(easelId)
        .then(() => dispatch(removeEasel(easelId)))
)