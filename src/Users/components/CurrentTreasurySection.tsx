const TreasuryData = {
  amount: "12,568.00",
  currency: "LYD",
};

const CurrentTreasurySection = () => {
  return (
    <div className="border w-80 border-Primary-25 p-4 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-Primary-600 ">
        Current treasury amount
      </h3>

      <span className="text-Primary-500 h-6 font-semibold text-lg">
        {TreasuryData.amount} {TreasuryData.currency}
      </span>
    </div>
  );
};

export default CurrentTreasurySection;
