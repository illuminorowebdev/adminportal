import { all, takeLatest } from 'redux-saga/effects';
import actionTypes from 'redux/constants';
import { login, logout } from './auth';
import { refreshApp } from './app';

export default function* root() {
  yield all([
    takeLatest(actionTypes.ACTION_LOGIN, login),
    takeLatest(actionTypes.ACTION_LOGOUT, logout),
    takeLatest(actionTypes.ACTION_REFRESH_APP, refreshApp),
  ]);
}
