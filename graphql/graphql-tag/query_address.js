import gql from "graphql-tag";

export const GET_PROVINCES = gql`
  query GET_PROVINCES {
    get_provinces {
      province_id
      province_code
      province_name
      province_name_eng
      geo_id
    }
  }
`;

export const GET_AMPHURES = gql`
  query GET_AMPHURES($province_id: String) {
    get_amphures(province_id: $province_id) {
      amphur_id
      amphur_code
      amphur_name
      amphur_name_eng
      province_id
    }
  }
`;

export const GET_DISTRICTS = gql`
  query GET_DISTRICTS($province_id: String, $amphur_id: String) {
    get_districts(province_id: $province_id, amphur_id: $amphur_id) {
      district_id
      district_code
      district_name
      district_name_eng
    }
  }
`;

export const GET_ZIPCODES = gql`
  query GET_ZIPCODES($district_code: String) {
  get_zipcodes(district_code:$district_code){
    zipcode_id
    district_code
    zipcode_name
  }
}
`;