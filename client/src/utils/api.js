import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
export const userProfile = () => api.get(`/auth/profile`);
// Auction
export const createAuc = (formData) =>
  api.post(`/auction/create-auction`, formData);
export const getAuctions = (userId) => api.get(`/auction/get/${userId}`);
export const getSingleAuction = (auctionId) =>
  api.get(`/auction/one-auction/${auctionId}`);
export const updateAuctionApi = (auctionId, formData) =>
  api.put(`/auction/update/${auctionId}`, formData);
export const deleteAuction = (userId) =>
  api.delete(`/auction/delete/${userId}`);

// Team
export const createTeamsApi = (formData) => api.post(`/teams/create`, formData);
export const getAllTeamsApi = (auctionId) =>
  api.get(`/teams/get-all/${auctionId}`);
export const getTeam = (auctionId, teamId) =>
  api.get(`/teams/get-one/${auctionId}/${teamId}`);
export const updateTeamApi = (formData) => api.put(`/teams/update`, formData);
export const deleteTeam = (auctionId, teamId) =>
  api.delete(`/teams/delete/${auctionId}/${teamId}`);

// Players
export const createPlayersApi = (formData) =>
  api.post(`/players/create`, formData);
export const getAllPlayersApi = (auctionId) =>
  api.get(`/players/all-players/${auctionId}`);
export const getPlayerByIdApi = (auctionId, playerId) =>
  api.get(`/players/get-one/${auctionId}/${playerId}`);
export const updatePlayerApi = (formData) =>
  api.put(`/players/update`, formData);
export const deletePlayer = (auctionId, playerId) =>
  api.delete(`/players/delete/${auctionId}/${playerId}`);
export const updatePlayerBasePriceApi = ({ minimumBid, playerId, auctionId }) =>
  api.put(`/players/change-baseprice`, {
    minimumBid,
    playerId,
    auctionId,
  });
