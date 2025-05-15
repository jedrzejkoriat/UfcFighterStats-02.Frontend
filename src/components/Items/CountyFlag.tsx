import React from 'react';
import flags from 'emoji-flags';

interface Props {
    country?: string | null;
}

const CountryFlag: React.FC<Props> = ({ country }) => {
    if (!country) return <></>;

    const flag = flags.name(country)?.emoji || '';
    return (
        <span>
            {flag} {country}
        </span>
    );
};

export default CountryFlag;