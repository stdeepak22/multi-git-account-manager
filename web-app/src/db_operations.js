import { gitProfileActions } from "../store/slices/gitProfileSlice";
import { gitRepoMappingActions } from "../store/slices/gitRepoMappingSlice";
import { db_delete, db_getData, db_path, db_setData, generateSshKeys, removeSshKeys } from "./non-component-sharing"

export const getAllProfiles = async () => {
    return await db_getData(db_path.allProfiles, []);
}

export const getAllRepositories = async () => {
    return await db_getData(db_path.allRepos, []);
}

export const addProfile = async (dispatch, gitUserName) => {
    await generateSshKeys(gitUserName);
    await db_setData(db_path.userProfile(gitUserName), {
        gitUserName,
        addedAt: new Date().toISOString(),
        profileLink: `https://github.com/${gitUserName}`,
        keyGenerated: true,
        gitConfigured: false,
        connectionTested: false
    });
    dispatch(gitProfileActions.loadProfileAndSSHConfig())
}

export const profilePublickeyAddedToGit = async (gitUserName, configured) => {
    await db_setData(db_path.userProfile(gitUserName), {
        gitConfigured: configured
    }, true);
}

export const gitConnectedTested = async (gitUserName, isWorking) => {
    await db_setData(db_path.userProfile(gitUserName), {
        connectionTested: isWorking
    }, true);
}

export const deleteProfile = async (dispatch, gitUserName) => {
    await db_delete(db_path.userProfile(gitUserName));
    await removeSshKeys(gitUserName);
    dispatch(gitProfileActions.loadProfileAndSSHConfig());
}

export const gitRepoCloned = async (dispatch, gitUserName, repoName, dir) => {
    await db_setData(db_path.allRepos, [{
        repoName,
        owner: gitUserName,
        localPath: dir
    }], true);
    dispatch(gitRepoMappingActions.loadAllRepositories());
}