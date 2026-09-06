import fbData from "../../public/facebook_profile_61593182381752_2026-08-26_19-22-14.json";

function extractTitle(content) {
  if (!content) return "منشور جديد (Nouvelle publication)";
  const firstLine = content.split("\n")[0].trim();
  return firstLine.substring(0, 200) + (firstLine.length > 200 ? "..." : "");
}

function extractDate(timestampStr) {
  if (!timestampStr) return "";
  try {
    const d = new Date(timestampStr.replace(" ", "T"));
    if (isNaN(d.getTime())) return timestampStr.split(" ")[0];
    return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
  } catch (e) {
    return timestampStr.split(" ")[0];
  }
}

function extractDateFr(timestampStr) {
  if (!timestampStr) return "";
  try {
    const d = new Date(timestampStr.replace(" ", "T"));
    if (isNaN(d.getTime())) return timestampStr.split(" ")[0];
    return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" });
  } catch (e) {
    return timestampStr.split(" ")[0];
  }
}

function isDirectImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  return (
    url.includes("fbcdn.net") ||
    /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(url)
  );
}

export const postsData = (fbData.posts || []).map((post, index) => {
  const isVideo = post.post_type === "video" || post.media_type === "video";
  const postText = post.text || post.content || "";

  // Direct image from extra.images (video thumbnails, carousels) or media_url if it's an actual image
  const extraImg = post.extra?.images?.find(isDirectImageUrl);
  const mediaImg = isDirectImageUrl(post.media_url) ? post.media_url : null;
  const directImg = post.images?.find(isDirectImageUrl);

  const imageUrl = extraImg || mediaImg || directImg || "/yenja.png";

  const commentsCount = Array.isArray(post.comments)
    ? post.comments.length
    : typeof post.comments === "number"
    ? post.comments
    : post.comments_count || 0;

  const likesCount =
    typeof post.likes === "number"
      ? post.likes
      : post.reactions?.total || 0;

  const sharesCount =
    typeof post.shares === "number"
      ? post.shares
      : post.shares_count || 0;

  const dateStr = post.posted_at || post.timestamp || "";

  return {
    id: post.entity_id || post.post_id || index,
    title_ar: extractTitle(postText),
    title_fr: extractTitle(postText),
    content_ar: postText,
    content_fr: postText,
    date_ar: extractDate(dateStr),
    date_fr: extractDateFr(dateStr),
    category_ar: isVideo ? "فيديو" : "منشور",
    category_fr: isVideo ? "Vidéo" : "Publication",
    image: imageUrl,
    likes: likesCount,
    comments: commentsCount,
    shares: sharesCount,
    views: post.views ?? "N/A",
    fbUrl: post.url || post.post_url || "https://www.facebook.com/profile.php?id=61593182381752",
    badge_ar: "جديد",
    badge_fr: "Nouveau",
  };
});
