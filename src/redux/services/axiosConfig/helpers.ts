import type { AxiosRequestConfig } from "axios";
import axiosClient from "./config";

export const getCall = async (URL: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axiosClient.get(URL, config);
    return response?.data || {};
  } catch (error: any) {
    throw error;
  }
};

export const postCall = async (
  URL: string,
  payload?: object,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosClient.post(URL, payload, config);
    return response?.data || {};
  } catch (error: any) {
    throw error;
  }
};

export const putCall = async (
  URL: string,
  payload?: object,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosClient.put(URL, payload, config);
    return response?.data || {};
  } catch (error: any) {
    throw error;
  }
};

export const deleteCall = async (
  URL: string,
  payload?: object,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosClient.delete(URL, {
      data: payload,
      ...config,
    });
    return response?.data || {};
  } catch (error: any) {
    throw error;
  }
};
