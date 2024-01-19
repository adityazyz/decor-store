// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const pincodes = [110043,110072,110071,110073,248007,110069];
    res.status(200).send(pincodes);
  }
   