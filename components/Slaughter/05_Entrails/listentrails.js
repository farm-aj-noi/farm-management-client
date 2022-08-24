import React, { useState } from "react";
import Router from 'next/router'
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";
import Barcodebutton from "../99_Barcode/2_Entrail";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { QUERY_CARD } from '../../../pages/slaughter/entrails'

import { Wightinput } from "./EntrailsFrom";
// import LoadingPage from "../../../helps/LoadingPage";

const UPDATE_STATUSEN = gql`
  mutation UPDATE_STATUSEN($id: ID!) {
    updateImslaughterStatusEn(id: $id) {
      statusEn {
        id
        nameTH
        code
      }
    }
  }
`;

const CREATE_ENTRAIL = gql`
  mutation CreateEntrailMutation(
    $imslaughter: String!
    $fat: String!
    $gallbladder: String!
    $head: String!
    $liver: String!
    $offal: String!
    $onkale: String!
    $scrap: String!
    $skin: String!
    $tail: String!
    $toe: String!
  ) {
    createEntrail(
      imslaughter: $imslaughter
      fat: $fat
      gallbladder: $gallbladder
      head: $head
      liver: $liver
      offal: $offal
      onkale: $onkale
      scrap: $scrap
      skin: $skin
      tail: $tail
      toe: $toe
    ) {
      id
      offal
      toe
      head
      skin
      liver
      fat
      onkale
      tail
      gallbladder
      scrap
      createdAt
      barcode
      imslaughter {
        id
        numcow
        numkun
      }
    }
  }
`;

const UPDATE_ENTRAIL = gql`
  mutation UpdateEntrailMutation(
    $id: ID!
    $fat: String
    $gallbladder: String
    $head: String
    $liver: String
    $offal: String
    $onkale: String
    $scrap: String
    $skin: String
    $tail: String
    $toe: String
  ) {
    updateEntrail(
      id: $id
      fat: $fat
      gallbladder: $gallbladder
      head: $head
      liver: $liver
      offal: $offal
      onkale: $onkale
      scrap: $scrap
      skin: $skin
      tail: $tail
      toe: $toe
    ) {
      id
      offal
      toe
      head
      skin
      liver
      fat
      onkale
      tail
      gallbladder
      scrap
      createdAt
      barcode
      imslaughter {
        id
        numcow
        numkun
      }
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(edit);
  const [entrailData, setEntrailData] = useState({
    id: !!imslaughter.id ? imslaughter.id : "none",
    numkun: !!imslaughter.numkun ? imslaughter.numkun : "none",
    numcow: !!imslaughter.numcow ? imslaughter.numcow : "none",
    offal: !!imslaughter.entrails ? imslaughter.entrails.offal : null,
    toe: !!imslaughter.entrails ? imslaughter.entrails.toe : null,
    head: !!imslaughter.entrails ? imslaughter.entrails.head : null,
    skin: !!imslaughter.entrails ? imslaughter.entrails.skin : null,
    liver: !!imslaughter.entrails ? imslaughter.entrails.liver : null,
    fat: !!imslaughter.entrails ? imslaughter.entrails.fat : null,
    onkale: !!imslaughter.entrails ? imslaughter.entrails.onkale : null,
    tail: !!imslaughter.entrails ? imslaughter.entrails.tail : null,
    gallbladder: !!imslaughter.entrails
      ? imslaughter.entrails.gallbladder
      : null,
    scrap: !!imslaughter.entrails ? imslaughter.entrails.scrap : null,
    statusEn: !!imslaughter.statusEn ? imslaughter.statusEn.nameTH : "none",
    idEntrail: !!imslaughter.entrails ? imslaughter.entrails.id : "none",
    barcode: !!imslaughter.entrails ? imslaughter.entrails.barcode : null,
  });
  console.log(entrailData.id);

  const [inputData, setinputData] = useState({
    offal: !!entrailData.offal ? entrailData.offal : null,
    toe: !!entrailData.toe ? entrailData.toe : null,
    head: !!entrailData.head ? entrailData.head : null,
    skin: !!entrailData.skin ? entrailData.skin : null,
    liver: !!entrailData.liver ? entrailData.liver : null,
    fat: !!entrailData.fat ? entrailData.fat : null,
    onkale: !!entrailData.onkale ? entrailData.onkale : null,
    tail: !!entrailData.tail ? entrailData.tail : null,
    gallbladder: !!entrailData.gallbladder ? entrailData.gallbladder : null,
    scrap: !!entrailData.scrap ? entrailData.scrap : null,
  });
  // console.log(inputData);

  const [updateStatusEn, { error }] = useMutation(UPDATE_STATUSEN, {
    onCompleted: (data) => {
      // console.log(data.updateImslaughterStatusCa.statusCa)
      // console.log(halveData.statusCa)
      setEntrailData({
        ...entrailData,
        statusEn: data.updateImslaughterStatusEn.statusEn,
      });
      setEdit(false);
    },
  });

  const [createEntrail] = useMutation(CREATE_ENTRAIL, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      setEntrailData({
        idEntrail: data.createEntrail.id,
        offal: data.createEntrail.offal,
        toe: data.createEntrail.toe,
        head: data.createEntrail.head,
        skin: data.createEntrail.skin,
        liver: data.createEntrail.liver,
        fat: data.createEntrail.fat,
        onkale: data.createEntrail.onkale,
        tail: data.createEntrail.tail,
        gallbladder: data.createEntrail.gallbladder,
        scrap: data.createEntrail.scrap,
        id: data.createEntrail.imslaughter.id,
        numkun: data.createEntrail.imslaughter.numkun,
        numcow: data.createEntrail.imslaughter.numcow,
        barcode: data.createEntrail.barcode
      });
      setEdit(false);
      // Router.reload(window.location.pathname);
    },
    refetchQueries: [
      {
        query: QUERY_CARD,
      },
    ],
  });

  const [updateEntrail] = useMutation(UPDATE_ENTRAIL, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      setEntrailData({
        idEntrail: data.updateEntrail.id,
        offal: data.updateEntrail.offal,
        toe: data.updateEntrail.toe,
        head: data.updateEntrail.head,
        skin: data.updateEntrail.skin,
        liver: data.updateEntrail.liver,
        fat: data.updateEntrail.fat,
        onkale: data.updateEntrail.onkale,
        tail: data.updateEntrail.tail,
        gallbladder: data.updateEntrail.gallbladder,
        scrap: data.updateEntrail.scrap,
        id: data.updateEntrail.imslaughter.id,
        numkun: data.updateEntrail.imslaughter.numkun,
        numcow: data.updateEntrail.imslaughter.numcow,
      });
      setEdit(false);
    },
  });

  const handleSubmitFirst = async () => {
    setLoading(true);
    await createEntrail({
      variables: {
        imslaughter: entrailData.id,
        offal: inputData.offal,
        toe: inputData.toe,
        head: inputData.head,
        skin: inputData.skin,
        liver: inputData.liver,
        fat: inputData.fat,
        onkale: inputData.onkale,
        tail: inputData.tail,
        gallbladder: inputData.gallbladder,
        scrap: inputData.scrap,
      },
    });
    await updateStatusEn({
      variables: {
        id: entrailData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  const handleSubmitUpdate = async () => {
    setLoading(true);
    await updateEntrail({
      variables: {
        id: entrailData.idEntrail,
        offal: inputData.offal,
        toe: inputData.toe,
        head: inputData.head,
        skin: inputData.skin,
        liver: inputData.liver,
        fat: inputData.fat,
        onkale: inputData.onkale,
        tail: inputData.tail,
        gallbladder: inputData.gallbladder,
        scrap: inputData.scrap,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{entrailData.numkun}</td>
      <td>{entrailData.numcow}</td>
      <td>
        {entrailData.offal === null && !edit ? (
          <Wightinput
            type="number"
            name="offal"
            onChange={(event) =>
              setinputData({
                ...inputData,
                offal: event.target.value,
              })
            }
          />
        ) : entrailData.offal !== null && !edit ? (
          entrailData.offal
        ) : (
          <Wightinput
            type="number"
            name="offal"
            value={inputData.offal}
            onChange={(event) =>
              setinputData({
                ...inputData,
                offal: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.toe === null && !edit ? (
          <Wightinput
            type="number"
            name="toe"
            onChange={(event) =>
              setinputData({
                ...inputData,
                toe: event.target.value,
              })
            }
          />
        ) : entrailData.toe !== null && !edit ? (
          entrailData.toe
        ) : (
          <Wightinput
            type="number"
            name="toe"
            value={inputData.toe}
            onChange={(event) =>
              setinputData({
                ...inputData,
                toe: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.head === null && !edit ? (
          <Wightinput
            type="number"
            name="head"
            onChange={(event) =>
              setinputData({
                ...inputData,
                head: event.target.value,
              })
            }
          />
        ) : entrailData.head !== null && !edit ? (
          entrailData.head
        ) : (
          <Wightinput
            type="number"
            name="head"
            value={inputData.head}
            onChange={(event) =>
              setinputData({
                ...inputData,
                head: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.skin === null && !edit ? (
          <Wightinput
            type="number"
            name="skin"
            onChange={(event) =>
              setinputData({
                ...inputData,
                skin: event.target.value,
              })
            }
          />
        ) : entrailData.skin !== null && !edit ? (
          entrailData.skin
        ) : (
          <Wightinput
            type="number"
            name="skin"
            value={inputData.skin}
            onChange={(event) =>
              setinputData({
                ...inputData,
                skin: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.liver === null && !edit ? (
          <Wightinput
            type="number"
            name="liver"
            onChange={(event) =>
              setinputData({
                ...inputData,
                liver: event.target.value,
              })
            }
          />
        ) : entrailData.liver !== null && !edit ? (
          entrailData.liver
        ) : (
          <Wightinput
            type="number"
            name="liver"
            value={inputData.liver}
            onChange={(event) =>
              setinputData({
                ...inputData,
                liver: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.fat === null && !edit ? (
          <Wightinput
            type="number"
            name="liver"
            onChange={(event) =>
              setinputData({
                ...inputData,
                fat: event.target.value,
              })
            }
          />
        ) : entrailData.fat !== null && !edit ? (
          entrailData.fat
        ) : (
          <Wightinput
            type="number"
            name="fat"
            value={inputData.fat}
            onChange={(event) =>
              setinputData({
                ...inputData,
                fat: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.onkale === null && !edit ? (
          <Wightinput
            type="number"
            name="liver"
            onChange={(event) =>
              setinputData({
                ...inputData,
                onkale: event.target.value,
              })
            }
          />
        ) : entrailData.onkale !== null && !edit ? (
          entrailData.onkale
        ) : (
          <Wightinput
            type="number"
            name="onkale"
            value={inputData.onkale}
            onChange={(event) =>
              setinputData({
                ...inputData,
                onkale: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.tail === null && !edit ? (
          <Wightinput
            type="number"
            name="liver"
            onChange={(event) =>
              setinputData({
                ...inputData,
                tail: event.target.value,
              })
            }
          />
        ) : entrailData.tail !== null && !edit ? (
          entrailData.tail
        ) : (
          <Wightinput
            type="number"
            name="tail"
            value={inputData.tail}
            onChange={(event) =>
              setinputData({
                ...inputData,
                tail: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.gallbladder === null && !edit ? (
          <Wightinput
            type="number"
            name="liver"
            onChange={(event) =>
              setinputData({
                ...inputData,
                gallbladder: event.target.value,
              })
            }
          />
        ) : entrailData.gallbladder !== null && !edit ? (
          entrailData.gallbladder
        ) : (
          <Wightinput
            type="number"
            name="gallbladder"
            value={inputData.gallbladder}
            onChange={(event) =>
              setinputData({
                ...inputData,
                gallbladder: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.scrap === null && !edit ? (
          <Wightinput
            type="number"
            name="liver"
            onChange={(event) =>
              setinputData({
                ...inputData,
                scrap: event.target.value,
              })
            }
          />
        ) : entrailData.scrap !== null && !edit ? (
          entrailData.scrap
        ) : (
          <Wightinput
            type="number"
            name="scrap"
            value={inputData.scrap}
            onChange={(event) =>
              setinputData({
                ...inputData,
                scrap: event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {entrailData.offal &&
          entrailData.toe &&
          entrailData.head &&
          entrailData.skin &&
          entrailData.liver &&
          entrailData.fat &&
          entrailData.onkale &&
          entrailData.tail &&
          entrailData.gallbladder &&
          entrailData.scrap ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>
      <td>
        {entrailData.offal &&
          entrailData.toe &&
          entrailData.head &&
          entrailData.skin &&
          entrailData.liver &&
          entrailData.fat &&
          entrailData.onkale &&
          entrailData.tail &&
          entrailData.gallbladder &&
          entrailData.scrap
          ? (
            <Barcodebutton barcode={entrailData} />
          ) : (
            "-"
          )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !entrailData.offal &&
          !entrailData.toe &&
          !entrailData.head &&
          !entrailData.skin &&
          !entrailData.liver &&
          !entrailData.fat &&
          !entrailData.onkale &&
          !entrailData.tail &&
          !entrailData.gallbladder &&
          !entrailData.scrap &&
          !edit ? (
          <Savebuttoncolor
            style={{
              backgroundColor: `${!inputData.offal ||
                !inputData.toe ||
                !inputData.head ||
                !inputData.skin ||
                !inputData.liver ||
                !inputData.fat ||
                !inputData.onkale ||
                !inputData.tail ||
                !inputData.gallbladder ||
                !inputData.scrap
                ? "gray"
                : ""
                }`,
            }}
            onClick={handleSubmitFirst}
            disabled={
              !inputData.offal ||
              !inputData.toe ||
              !inputData.head ||
              !inputData.skin ||
              !inputData.liver ||
              !inputData.fat ||
              !inputData.onkale ||
              !inputData.tail ||
              !inputData.gallbladder ||
              !inputData.scrap
            }
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : entrailData.offal &&
          entrailData.toe &&
          entrailData.head &&
          entrailData.skin &&
          entrailData.liver &&
          entrailData.fat &&
          entrailData.onkale &&
          entrailData.tail &&
          entrailData.gallbladder &&
          entrailData.scrap &&
          !edit ? (
          <div>
            <Editbuttoncolor onClick={() => setEdit(true)}>
              <Editbutton />
            </Editbuttoncolor>{" "}
            {/* <Barcodebutton barcode={entrailData.barcode} /> */}
          </div>
        ) : (
          <div>
            <Savebuttoncolor
              style={{
                backgroundColor: `${!inputData.offal ||
                  !inputData.toe ||
                  !inputData.head ||
                  !inputData.skin ||
                  !inputData.liver ||
                  !inputData.fat ||
                  !inputData.onkale ||
                  !inputData.tail ||
                  !inputData.gallbladder ||
                  !inputData.scrap
                  ? "gray"
                  : ""
                  }`,
              }}
              onClick={handleSubmitUpdate}
              disabled={
                !inputData.offal ||
                !inputData.toe ||
                !inputData.head ||
                !inputData.skin ||
                !inputData.liver ||
                !inputData.fat ||
                !inputData.onkale ||
                !inputData.tail ||
                !inputData.gallbladder ||
                !inputData.scrap
              }
            >
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>

    </tr>
  );
};

export default Imslaughter;
