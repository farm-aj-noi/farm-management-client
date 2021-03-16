import { useQuery } from "@apollo/react-hooks";
import { GET_PROVINCES, GET_AMPHURES , GET_DISTRICTS ,GET_ZIPCODES} from "../graphql-tag/query_address";

export function get_provinces() {
  var { data, loading, error } = useQuery(GET_PROVINCES);

  if (loading) return { status: "Loading" };
  if (error) return { status: "Error", msg: `Error! ${error.message}` };

  return { status: "Success", data: data.get_provinces };
}

export function get_amphures(args) {
  // if(!args.province_id) {
  //   return 'Param province_id undifinded'
  // }
  let province_id = args.province_id;
  var { data, loading, error } = useQuery(GET_AMPHURES, {
    variables: {
      province_id: province_id,
    },
  });

  if (loading) return { status: "Loading" };
  if (error) return { status: "Error", msg: `Error! ${error.message}` };

  return { status: "Success", data: data.get_amphures };
}

export function get_districts(args) {
  // if(!args.province_id) {
  //   return 'Param province_id undifinded'
  // }
  let province_id = args.province_id;
  let amphur_id = args.amphur_id;
  var { data, loading, error } = useQuery(GET_DISTRICTS, {
    variables: {
      province_id: province_id,
      amphur_id: amphur_id
    },
  });

  if (loading) return { status: "Loading" };
  if (error) return { status: "Error", msg: `Error! ${error.message}` };

  return { status: "Success", data: data.get_districts };
}

export function get_zipcodes(args) {
  // if(!args.province_id) {
  //   return 'Param province_id undifinded'
  // }
  let district_code = args.district_code;
  var { data, loading, error } = useQuery(GET_ZIPCODES, {
    variables: {
      district_code: district_code,
    },
  });

  if (loading) return { status: "Loading" };
  if (error) return { status: "Error", msg: `Error! ${error.message}` };

  return { status: "Success", data: data.get_zipcodes };
}

