import fbData from "../../public/facebook_profile_61593182381752_2026-08-26_19-22-14.json";

function extractTitle(content) {
  if (!content) return "منشور جديد (Nouvelle publication)";
  const firstLine = content.split('\n')[0].trim();
  // Limit to 200 characters to show more text
  return firstLine.substring(0, 200) + (firstLine.length > 200 ? "..." : "");
}

function extractDate(timestampStr) {
  if (!timestampStr) return "";
  try {
    const d = new Date(timestampStr);
    return d.toLocaleDateString("ar-EG");
  } catch (e) {
    return timestampStr.split(" ")[0];
  }
}

function extractDateFr(timestampStr) {
  if (!timestampStr) return "";
  try {
    const d = new Date(timestampStr);
    return d.toLocaleDateString("fr-FR");
  } catch (e) {
    return timestampStr.split(" ")[0];
  }
}

export const postsData = fbData.posts.map((post, index) => {
  const isVideo = post.post_type === "video";
  let imageUrl = "/backg.png"; // fallback

  if (post.images && post.images.length > 0) {
    imageUrl = post.images[0];
  }

  return {
    id: post.post_id || index,
    title_ar: extractTitle(post.content),
    title_fr: extractTitle(post.content),
    content_ar: post.content || "",
    content_fr: post.content || "",
    date_ar: extractDate(post.timestamp),
    date_fr: extractDateFr(post.timestamp),
    category_ar: isVideo ? "فيديو" : "منشور",
    category_fr: isVideo ? "Vidéo" : "Publication",
    image: imageUrl,
    likes: post.reactions?.total || 0,
    comments: post.comments_count || 0,
    shares: post.shares_count || 0,
    views: "N/A",
    fbUrl: post.post_url || "https://www.facebook.com/profile.php?id=61593182381752",
    badge_ar: "جديد",
    badge_fr: "Nouveau",
  };
});
