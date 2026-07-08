export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }


  const { platform, content } = req.body;


  if (!platform || !content) {

    return res.status(400).json({
      error: "Platform and content required"
    });

  }



  try {


    /*
      Future connections:

      Facebook Pages API
      Instagram Graph API
      TikTok API
      LinkedIn API

      Credentials will be stored safely
      in Vercel Environment Variables.
    */


    res.status(200).json({

      success: true,

      message:
      `${platform} publishing system ready`,

      preview: content

    });


  } catch(error) {


    res.status(500).json({

      error:
      "Publishing system failed"

    });


  }

}