import express from "express";

declare module 'express' {
  interface Request {
      user?: User
  }
}