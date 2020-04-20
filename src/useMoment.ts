import { useState, useEffect } from 'react';
import { Moment } from 'moment';

const useMoment = () => {
  const [moment, setMoment] = useState<Moment>();
  useEffect(() => {
    const getModule = async () => {
      const module = await import(
        /* webpackChunkName: "moment" */
        'moment'
      );
      setMoment(module.default);
    };
    getModule();
  }, []);
  return [moment];
};

export default useMoment;
