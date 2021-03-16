// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from "graphql-tag";

export const QUERY_CARD1 = gql`
  query QUERY_CARD1 {
    get_provinces {
      province_id
      province_code
      province_name
      province_name_eng
      geo_id
    }
  }
`;

export default async function handler(req, res) {
  res.statusCode = 200;
  if (req.test) {
    res.test2 = req.test;
  }
  console.log(process.env.NEXT_PUBLIC_GRAPHQL_API)
  res.json(111);
}

// export default function handler(req, res) {
//   res.status(200).json({ name: 'Next.js' })
// }
