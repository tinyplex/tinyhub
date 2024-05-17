import {Octokit} from 'octokit';

export const octokit = new Octokit({auth: localStorage.getItem('token')});
