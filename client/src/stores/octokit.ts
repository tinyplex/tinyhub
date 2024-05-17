import {Octokit} from 'octokit';

export const octokit = new Octokit({auth: localStorage.getItem('token')});

export const hasToken = () => localStorage.getItem('token') != null;
