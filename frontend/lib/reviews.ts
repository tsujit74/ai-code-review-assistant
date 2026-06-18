import { api } from "./api";

export async function createReview(
  projectId: string,
  type: string,
  providerId: string,
) {
  const res = await api.post("/reviews", {
    projectId,
    type,
    providerId,
  });

  return res.data;
}

export async function fetchProjectReviews(projectId: string) {
  const res = await api.get(`/reviews/project/${projectId}`);
  return res.data;
}

export async function fetchReview(reviewId: string) {
  const res = await api.get(`/reviews/${reviewId}`);
  return res.data;
}
