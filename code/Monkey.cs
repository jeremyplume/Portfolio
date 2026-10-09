using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rougelette.Characters
{
    public sealed class Monkey : Character
    {
        public Monkey()
        {
            // I think it would be cool if monkey had poor money and max values but a starting item is a really good one to balancce it out
            Name = "Monkey";
            StartingMoney = 1;
            Min = 0;
            Max = 4;
        }

        public override int Spin()
        {
            Random rand = new Random();
            int rolledNum = rand.Next(Min, Max + 1);
            return rolledNum;
        }
    }
}
