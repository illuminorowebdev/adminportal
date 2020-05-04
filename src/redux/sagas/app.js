import { put, call } from 'redux-saga/effects';
import * as APIs from 'services/api';
import { logout } from 'redux/actions/auth';
import { updateApp } from 'redux/actions/app';

export function* refreshApp() {
  try {
    const response = yield call(APIs.getProfile);

    yield put(
      updateApp({
        profile: response,
      })
    );
  } catch (error) {
    yield put(logout());
  }
}
