import { makeAutoObservable } from "mobx";
import { mockApi } from "./axiosAPI";
import bcrypt from "bcryptjs";

class UserStore {
  user = null;
  token = null;
  favourites = [];

  constructor() {
    makeAutoObservable(this);
  }

  async signUp(username, email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const response = await mockApi.post("/users", {
      username,
      email,
      passwordHash,
    });
    this.user = response.data;
    this.token = btoa(`${this.user.id}:${Date.now()}`); // Fake JWT
    localStorage.setItem("token", this.token);
  }

  async login(email, password) {
    const response = await mockApi.get(`/users?email=${email}`);
    const user = response.data[0];
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new Error("Invalid password");

    this.user = user;
    this.token = btoa(`${user.id}:${Date.now()}`);
    localStorage.setItem("token", this.token);
  }

  logout() {
    this.user = null;
    this.token = null;
    this.favourites = [];
    localStorage.removeItem("token");
  }

  async fetchFavourites() {
    if (!this.user) return;
    const res = await mockApi.get(`/favourites`);
    this.favourites = res.data
    .filter((f) => f.userId == this.user.id)
    .map((f) => f.courseId);
  }

  async toggleFavourite(courseId, favourites) {
    if (!this.user) return;

    if (favourites.includes(courseId)) {
      // Remove from favourites
      const res = await mockApi.get(`/favourites?userId=${this.user.id}&courseId=${courseId}`);
      const favId = res.data[0]?.id;
      if (favId) {
        await mockApi.delete(`/favourites/${favId}`);
      }
      this.favourites = favourites.filter((id) => id !== courseId);
    } else {
      // Add favourites
      await mockApi.post("/favourites", {
        userId: this.user.id,
        courseId,
      });
      this.favourites.push(courseId);
    }
  }

  async updateProfile({ username, about, email, password, profileImage }) {
    if (!this.user) return;

    const payload = { username, about, email, profileImage };

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      payload.passwordHash = hash;
    }

    const res = await mockApi.put(`/users/${this.user.id}`, payload);
    this.user = res.data;
  }
}


//create mobX instance
export const userStore = new UserStore();