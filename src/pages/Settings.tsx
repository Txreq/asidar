import {
  Button,
  FileInput,
  Group,
  Modal,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useReducer, useState } from "react";
import Panel from "../components/Panel";

const os = window.require("os");
const { ipcRenderer } = window.require("electron");

export default function SettingsTab() {
  const [user, setUser] = useState(os.userInfo());
  const [state, dispatch] = useReducer(reducer, {});
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    ipcRenderer.invoke("user-prefs").then((data: any) => {
      dispatch({ type: ACTIONS.INITIALIZE, payload: data });
    });

    return () => {
      console.log(1);
      dispatch({ type: -1 });
    };
  }, []);

  function dirPickHandler(selectedFolder: any) {
    if (!selectedFolder?.canceled) {
      dispatch({
        type: ACTIONS.UPDATE.DIR,
        payload: selectedFolder,
      });
    }
  }

  function saveHandler() {
    ipcRenderer.invoke("save", state.user).then(() => {
      alert("All of your settings have been saved succefuly !");
      dispatch({
        type: ACTIONS.SAVE,
      });
    });
  }

  function RestorationModal() {
    return (
      <Modal
        centered={true}
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text>Settings restoration</Text>}
      >
        <Stack>
          <Text>
            Are you sure you want to restore your preferences to the app's
            default?
          </Text>
          <Group position="right">
            <Button color="gray" onClick={() => setOpened(false)}>
              No
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: ACTIONS.RESTORE });
                setOpened(false);
              }}
            >
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal>
    );
  }

  return (
    <>
      <RestorationModal />
      <Panel
        value="settings"
        title={
          (typeof user.username == "string" ? user.username : "user") +
          "'s preferences"
        }
      >
        <Space h="xl" />
        <Stack
          justify="space-between"
          sx={(theme) => ({ height: "calc(100vh - 95px)" })}
        >
          <Stack className="inputs">
            <FileInput
              placeholder={state?.user?.defaultDownloadsPath}
              label="default downloads location"
              onClick={() => {
                ipcRenderer.invoke("select-dir").then(dirPickHandler);
              }}
            />
          </Stack>

          <Stack
            justify="flex-end"
            align="center"
            style={{ flexDirection: "row" }}
          >
            <Button
              color="gray"
              onClick={() => {
                setOpened(true);
              }}
            >
              Restore
            </Button>
            <Button disabled={!state.edited} onClick={saveHandler}>
              Save
            </Button>
          </Stack>
        </Stack>
        <Text></Text>
      </Panel>
    </>
  );
}

function reducer(
  state: any,
  action: { type: string | number; payload?: any }
): any {
  switch (action.type) {
    case ACTIONS.INITIALIZE:
      return { edited: false, ...action.payload };
    case ACTIONS.SAVE:
      return { ...state, edited: false };

    case ACTIONS.RESTORE:
      return {
        ...state,
        edited: true,
        user: { ...state.defaultPrefs, lastTimeUpdated: new Date() },
      };

    case ACTIONS.UPDATE.DIR:
      return {
        ...state,
        edited: true,
        user: {
          ...state.user,
          defaultDownloadsPath: action.payload.filePaths[0],
        },
      };

    default:
      console.log(state);
      return state;
  }
}

const ACTIONS = {
  INITIALIZE: "init-state",
  SAVE: "save",
  RESTORE: "restore",
  UPDATE: {
    DIR: "dir",
  },
};
